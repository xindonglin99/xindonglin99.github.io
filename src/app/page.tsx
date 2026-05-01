import { EducationEntry } from "@/components/education-entry";
import { educationData } from "@/data/education";
import { PublicationEntry } from "@/components/publication-entry";
import { publicationData } from "@/data/publication";
import { ProfileSection } from "@/components/profile-section";
import { aboutMe } from "@/data/aboutme";
import { NewsEntry } from "@/components/news-entry";
import { newsData } from "@/data/news";
import { ExperienceEntry } from "@/components/experience-entry";
import { experienceData } from "@/data/experience";
import { PortfolioEntry } from "@/components/portfolio-entry";
import { portfolioData } from "@/data/portfolio";
import { sectionOrder, Section } from "@/data/section-order";
import { footerData } from "@/data/footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { WireframeSpheres } from "@/components/wireframe-spheres";

export default function Home() {
  return (
    <>
      <WireframeSpheres />
      <div className="relative z-10 min-h-screen">
      {/* Don't have a great call on whether max-w-screen-xl is better */}
      <div className="max-w-screen-lg mx-auto px-8 py-24">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
          {/* Left Column - Fixed Info */}
          <div className="col-span-12 md:col-span-4 space-y-12 mb-8 md:mb-0">
            {/* Profile */}
            <div className="md:sticky top-12 space-y-8">
              <ProfileSection aboutMe={aboutMe} />
            </div>
          </div>

          {/* Right Column - Scrolling Content */}
          <div className="col-span-12 md:col-span-7 md:col-start-6 space-y-24">
            {/* About section is typically first */}
            {aboutMe.description && (
              <ScrollReveal as="section">
                <p
                  className="font-serif text-sm leading-relaxed text-zinc-700 [&_a]:underline [&_a]:text-zinc-900 [&_a:hover]:text-zinc-600"
                  dangerouslySetInnerHTML={{ __html: aboutMe.description }}
                />
              </ScrollReveal>
            )}

            {/* Map through sectionOrder to render sections in correct order */}
            {sectionOrder.map((sectionName) => {
              // Most of this is redundant... but in case it needs to be unique.
              switch (sectionName) {
                case Section.News:
                  return (
                    newsData.length > 0 && (
                      <section key={sectionName}>
                        <ScrollReveal>
                          <h2 className="font-serif text-l mb-12 tracking-wide uppercase">
                            News
                          </h2>
                        </ScrollReveal>
                        <div className="space-y-12">
                          {newsData.map((news, index) => (
                            <ScrollReveal key={index} delay={(index + 1) * 80}>
                              <NewsEntry news={news} />
                              {index < newsData.length - 1 && (
                                <div className="h-px bg-zinc-200 my-8" />
                              )}
                            </ScrollReveal>
                          ))}
                        </div>
                      </section>
                    )
                  );
                case Section.Education:
                  return (
                    educationData.length > 0 && (
                      <section key={sectionName}>
                        <ScrollReveal>
                          <h2 className="font-serif text-zinc-700 mb-12 tracking-wide uppercase">
                            Education
                          </h2>
                        </ScrollReveal>
                        <div className="space-y-12">
                          {educationData.map((education, index) => (
                            <ScrollReveal key={index} delay={(index + 1) * 80}>
                              <EducationEntry education={education} />
                              {index < educationData.length - 1 && (
                                <div className="h-px bg-zinc-200 my-8" />
                              )}
                            </ScrollReveal>
                          ))}
                        </div>
                      </section>
                    )
                  );
                case Section.Publication:
                  return (
                    publicationData.length > 0 && (
                      <section key={sectionName}>
                        <ScrollReveal>
                          <h2 className="font-serif text-l mb-12 tracking-wide uppercase">
                            Publications
                          </h2>
                        </ScrollReveal>
                        <div className="space-y-12">
                          {publicationData.map((publication, index) => (
                            <ScrollReveal key={index} delay={(index + 1) * 80}>
                              <PublicationEntry publication={publication} />
                              {index < publicationData.length - 1 && (
                                <div className="h-px bg-zinc-200 my-8" />
                              )}
                            </ScrollReveal>
                          ))}
                        </div>
                      </section>
                    )
                  );
                case Section.Experience:
                  return (
                    experienceData.length > 0 && (
                      <section key={sectionName}>
                        <ScrollReveal>
                          <h2 className="font-serif text-md mb-12 tracking-wide uppercase">
                            Work Experience
                          </h2>
                        </ScrollReveal>
                        <div className="space-y-12">
                          {experienceData.map((experience, index) => (
                            <ScrollReveal key={index} delay={(index + 1) * 80}>
                              <ExperienceEntry experience={experience} />
                              {index < experienceData.length - 1 && (
                                <div className="h-px bg-zinc-200 my-8" />
                              )}
                            </ScrollReveal>
                          ))}
                        </div>
                      </section>
                    )
                  );
                case Section.Portfolio:
                  return (
                    portfolioData.length > 0 && (
                      <section key={sectionName}>
                        <ScrollReveal>
                          <h2 className="font-serif text-md mb-12 tracking-wide uppercase">
                            Projects
                          </h2>
                        </ScrollReveal>
                        <div className="space-y-12">
                          {portfolioData.map((portfolio, index) => (
                            <ScrollReveal key={index} delay={(index + 1) * 80}>
                              <PortfolioEntry portfolio={portfolio} />
                              {index < portfolioData.length - 1 && (
                                <div className="h-px bg-zinc-200 my-8" />
                              )}
                            </ScrollReveal>
                          ))}
                        </div>
                      </section>
                    )
                  );
                default:
                  return null;
              }
            })}

            <footer className="pt-12 text-sm text-zinc-400 font-serif">
              {footerData.text} {footerData.date}
            </footer>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
